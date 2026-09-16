import React, { useEffect } from 'react'
import { useAuth } from '../../auth/hooks/useAuth'
import { AdminProvider, useAdmin } from '../state/adminStore'
import { StatsCard } from '../components/StatsCard'
import { UserTable } from '../components/UserTable'
import { UserDetails } from '../components/UserDetails'
import { AdminSidebar } from '../components/AdminSidebar'
import { Loader } from '../../../shared/components/Loader'
import { Modal } from '../../../shared/components/Modal'
import { Button } from '../../../shared/components/Button'

const AdminDashboardContent: React.FC = () => {
  const { user } = useAuth()
  const {
    stats,
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
  } = useAdmin()

  useEffect(() => {
    loadDashboardData()
  }, [loadDashboardData])

  if (loading && !stats) {
    return <Loader fullScreen text="Loading Admin Dashboard..." />
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-slate-900 text-white font-semibold text-xs shadow-2xl animate-bounce">
          {toastMessage}
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        <AdminSidebar />

        <main className="flex-1 space-y-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
              Manage members, view system statistics, and control account permissions.
            </p>
          </div>

          {error && (
            <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          {stats && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StatsCard title="Total Users" value={stats.totalUsers} icon="👥" />
              <StatsCard title="Total Images" value={stats.totalImages} icon="🖼️" />
              <StatsCard title="Total Admins" value={stats.totalAdmins} icon="🛡️" />
            </div>
          )}

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Users</h2>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search user..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 w-full sm:w-48"
                />

                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="all">All Roles</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="superadmin">Superadmin</option>
                </select>
              </div>
            </div>

            <UserTable
              users={filteredUsers}
              currentUserId={user?._id || user?.id}
              updatingRoleId={updatingRoleId}
              onRoleChange={handleRoleChange}
              onInspectUser={handleInspectUser}
              onDeleteUser={(u) => setUserToDelete(u)}
            />
          </div>
        </main>
      </div>

      <Modal isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} title="User Details">
        <UserDetails user={selectedUser} posts={userImages} loading={loadingUserDetails} />
      </Modal>

      <Modal isOpen={!!userToDelete} onClose={() => setUserToDelete(null)} title="Delete User">
        <div className="space-y-4">
          <p className="text-sm text-gray-700 dark:text-slate-300">
            Are you sure you want to delete user <strong className="text-red-500">{userToDelete?.name}</strong> ({userToDelete?.email})? This action cannot be undone.
          </p>
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setUserToDelete(null)}>
              Cancel
            </Button>
            <Button variant="danger" isLoading={isDeleting} onClick={handleDeleteUser}>
              Delete User
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export const AdminDashboard: React.FC = () => {
  return (
    <AdminProvider>
      <AdminDashboardContent />
    </AdminProvider>
  )
}
