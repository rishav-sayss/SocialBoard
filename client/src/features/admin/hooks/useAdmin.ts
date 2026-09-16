import { useState, useCallback, useMemo } from 'react'
import {
  fetchAdminStats,
  fetchAdminUsers,
  fetchAdminUserDetails,
  updateUserRoleApi,
  deleteUserApi,
} from '../services/adminService'
import { AdminStats } from '../../../shared/types/admin.types'
import { User, UserRole } from '../../../shared/types/user.types'
import { Post } from '../../../shared/types/post.types'

export const useAdmin = () => {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const [searchQuery, setSearchQuery] = useState<string>('')
  const [roleFilter, setRoleFilter] = useState<string>('all')

  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [userImages, setUserImages] = useState<Post[]>([])
  const [loadingUserDetails, setLoadingUserDetails] = useState<boolean>(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false)

  const [userToDelete, setUserToDelete] = useState<User | null>(null)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  const [updatingRoleId, setUpdatingRoleId] = useState<string | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  const refreshStats = async () => {
    const statsRes = await fetchAdminStats()
    if (statsRes.success) setStats(statsRes.stats)
  }

  const loadDashboardData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [statsRes, usersRes] = await Promise.all([
        fetchAdminStats(),
        fetchAdminUsers(),
      ])
      if (statsRes.success) setStats(statsRes.stats)
      if (usersRes.success && Array.isArray(usersRes.users))
        setUsers(usersRes.users)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load dashboard data.')
    } finally {
      setLoading(false)
    }
  }, [])

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      setUpdatingRoleId(userId)
      const res = await updateUserRoleApi(userId, newRole)
      if (res.success) {
        setUsers((prev) =>
          prev.map((u) =>
            (u._id || u.id) === userId ? { ...u, role: newRole } : u
          )
        )
        showToast(`Role updated to ${newRole.toUpperCase()}`)
        await refreshStats()
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Failed to update role.')
    } finally {
      setUpdatingRoleId(null)
    }
  }

  const handleInspectUser = async (user: User) => {
    const uid = user._id || user.id
    if (!uid) return
    setSelectedUser(user)
    setIsDetailModalOpen(true)
    setLoadingUserDetails(true)
    setUserImages([])
    try {
      const res = await fetchAdminUserDetails(uid)
      if (res.success) setUserImages(res.images || [])
    } catch {
      setUserImages([])
    } finally {
      setLoadingUserDetails(false)
    }
  }

  const handleDeleteUser = async () => {
    if (!userToDelete) return
    const uid = userToDelete._id || userToDelete.id
    if (!uid) return
    try {
      setIsDeleting(true)
      const res = await deleteUserApi(uid)
      if (res.success) {
        setUsers((prev) => prev.filter((u) => (u._id || u.id) !== uid))
        showToast(`User "${userToDelete.name}" deleted.`)
        setUserToDelete(null)
        await refreshStats()
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Failed to delete user.')
    } finally {
      setIsDeleting(false)
    }
  }

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesRole = roleFilter === 'all' || u.role === roleFilter
      return matchesSearch && matchesRole
    })
  }, [users, searchQuery, roleFilter])

  return {
    stats,
    users,
    filteredUsers,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    roleFilter,
    setRoleFilter,
    selectedUser,
    userImages,
    loadingUserDetails,
    isDetailModalOpen,
    setIsDetailModalOpen,
    updatingRoleId,
    userToDelete,
    setUserToDelete,
    isDeleting,
    toastMessage,
    loadDashboardData,
    handleRoleChange,
    handleInspectUser,
    handleDeleteUser,
  }
}
