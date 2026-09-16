import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/hooks/useAuth'
import { ProfileProvider, useProfile } from '../state/profileStore'
import { ProfileHeader } from '../components/ProfileHeader'
import { ProfileInfo } from '../components/ProfileInfo'
import { SocialHandles } from '../components/SocialHandles'
import { UserPosts } from '../components/UserPosts'
import { Loader } from '../../../shared/components/Loader'
import { Post } from '../../../shared/types/post.types'
import { Modal } from '../../../shared/components/Modal'
import { EditPost } from '../../posts/components/EditPost'
import { usePosts } from '../../posts/hooks/usePosts'

const ProfileContent: React.FC = () => {
  const { user } = useAuth()
  const { profileUser, userPosts, loading, error, loadProfile } = useProfile()
  const { removePost } = usePosts()
  const navigate = useNavigate()

  const [editingPost, setEditingPost] = useState<Post | null>(null)

  useEffect(() => {
    loadProfile()
  }, [loadProfile])

  if (loading && !profileUser) {
    return <Loader fullScreen text="Loading profile..." />
  }

  const currentUser = profileUser || user

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto my-12 p-6 text-center bg-white dark:bg-slate-800 rounded-3xl border">
        <p className="text-gray-600 dark:text-slate-400">User session not available.</p>
      </div>
    )
  }

  const handleDeletePost = async (id: string) => {
    if (window.confirm('Delete this post?')) {
      await removePost(id)
      await loadProfile()
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {error && (
        <div className="p-4 mb-6 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      <ProfileHeader
        user={currentUser}
        isOwnProfile={true}
        onEditClick={() => navigate('/profile/edit')}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <ProfileInfo user={currentUser} postsCount={userPosts.length} />
        <SocialHandles handles={currentUser.socialHandles} />
      </div>

      <UserPosts
        posts={userPosts}
        onEditPost={(p) => setEditingPost(p)}
        onDeletePost={handleDeletePost}
      />

      <Modal isOpen={!!editingPost} onClose={() => setEditingPost(null)} title="Edit Post">
        {editingPost && (
          <EditPost
            post={editingPost}
            onClose={() => {
              setEditingPost(null)
              loadProfile()
            }}
          />
        )}
      </Modal>
    </div>
  )
}

export const Profile: React.FC = () => {
  return (
    <ProfileProvider>
      <ProfileContent />
    </ProfileProvider>
  )
}
