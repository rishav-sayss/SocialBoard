import React, { useState } from 'react'
import { usePosts } from '../hooks/usePosts'
import { useAuth } from '../../auth/hooks/useAuth'
import { PostList } from '../components/PostList'
import { UploadPost } from '../components/UploadPost'
import { EditPost } from '../components/EditPost'
import { Modal } from '../../../shared/components/Modal'
import { Post } from '../../../shared/types/post.types'

export const Home: React.FC = () => {
  const { posts, loading, error, removePost } = usePosts()
  const { user } = useAuth()

  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [showUploadModal, setShowUploadModal] = useState(false)

  const handleEdit = (post: Post) => {
    setEditingPost(post)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await removePost(id)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-gradient-to-r from-brand-600 to-indigo-600 dark:from-brand-900/60 dark:to-indigo-900/60 p-8 rounded-3xl text-white shadow-xl">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Social Board Feed</h1>
          <p className="text-brand-100 text-sm mt-1 max-w-xl">
            Explore images shared by the community. Share your moments with everyone!
          </p>
        </div>

        {user && (
          <button
            onClick={() => setShowUploadModal(true)}
            className="px-6 py-3 rounded-2xl bg-white text-brand-600 font-bold hover:bg-brand-50 transition-all shadow-lg text-sm flex items-center gap-2 whitespace-nowrap"
          >
            <span>✨</span> Create Post
          </button>
        )}
      </div>

      {/* Main Post Grid */}
      <PostList
        posts={posts}
        loading={loading}
        error={error}
        currentUserId={user?._id || user?.id}
        currentUserRole={user?.role}
        onEditPost={handleEdit}
        onDeletePost={handleDelete}
      />

      {/* Modal for uploading post */}
      <Modal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)} title="New Post">
        <UploadPost onSuccess={() => setShowUploadModal(false)} />
      </Modal>

      {/* Modal for editing post */}
      <Modal isOpen={!!editingPost} onClose={() => setEditingPost(null)} title="Edit Post">
        {editingPost && <EditPost post={editingPost} onClose={() => setEditingPost(null)} />}
      </Modal>
    </div>
  )
}
