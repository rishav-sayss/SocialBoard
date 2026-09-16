import React from 'react'
import { User, UserRole } from '../../../shared/types/user.types'

interface UserTableProps {
  users: User[]
  currentUserId?: string
  updatingRoleId: string | null
  onRoleChange: (userId: string, newRole: UserRole) => void
  onInspectUser: (user: User) => void
  onDeleteUser: (user: User) => void
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  currentUserId,
  updatingRoleId,
  onRoleChange,
  onInspectUser,
  onDeleteUser,
}) => {
  if (users.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 dark:text-slate-400 bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700">
        No users match the search criteria.
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-100 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-900/50 text-gray-500 dark:text-slate-400 text-xs uppercase font-semibold">
              <th className="py-4 px-6">User</th>
              <th className="py-4 px-6">Email</th>
              <th className="py-4 px-6">Role</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-700/60">
            {users.map((u) => {
              const uid = u._id || u.id || ''
              const isSelf = currentUserId === uid

              return (
                <tr key={uid} className="hover:bg-gray-50/50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold text-xs">
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white leading-tight">{u.name}</p>
                        {isSelf && (
                          <span className="text-[10px] font-extrabold text-brand-600 dark:text-brand-400 uppercase">
                            (You)
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6 text-gray-600 dark:text-slate-300">{u.email}</td>

                  <td className="py-4 px-6">
                    {isSelf ? (
                      <span className="px-3 py-1 text-xs font-bold rounded-full bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200 uppercase">
                        {u.role}
                      </span>
                    ) : (
                      <select
                        value={u.role}
                        disabled={updatingRoleId === uid}
                        onChange={(e) => onRoleChange(uid, e.target.value as UserRole)}
                        className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
                      >
                        <option value="user">USER</option>
                        <option value="admin">ADMIN</option>
                        <option value="superadmin">SUPERADMIN</option>
                      </select>
                    )}
                  </td>

                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onInspectUser(u)}
                        className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-slate-200 text-xs font-semibold transition-colors"
                      >
                        Inspect
                      </button>

                      {!isSelf && (
                        <button
                          onClick={() => onDeleteUser(u)}
                          className="px-3 py-1.5 rounded-xl bg-red-50 dark:bg-red-950/40 hover:bg-red-100 text-red-600 dark:text-red-400 text-xs font-semibold transition-colors"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
