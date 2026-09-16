import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { usePosts } from '../hooks/usePosts'
import { useAuth } from '../../auth/hooks/useAuth'
import { Post } from '../../../shared/types/post.types'
import { Loader } from '../../../shared/components/Loader'
import { Button } from '../../../shared/components/Button'
import { Modal } from '../../../shared/components/Modal'
import { EditPost } from '../components/EditPost'
import { LikeButton } from '../../social/components/LikeButton'
import { CommentSection } from '../../social/components/CommentSection'

export const PostDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { fetchSinglePost, removePost } = usePosts()
  const { user } = useAuth()

  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (!id) return
    let isMounted = true
    setLoading(true)
    fetchSinglePost(id).then((data) => {
      if (isMounted) {
        setPost(data)
        setLoading(false)
      }
    })
    return () => {
      isMounted = false
    }
  }, [id, fetchSinglePost])

  if (loading) {
    return <Loader fullScreen text="Fetching post details..." />
  }

  if (!post) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 text-center">
        <div className="text-4xl mb-3">🔍</div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Post not found</h2>
        <p className="text-sm text-gray-500 dark:text-slate-400 mt-2 mb-6">
          The requested post could not be found or may have been deleted.
        </p>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    )
  }

  const uploaderId =
    typeof post.uploadedBy === 'object' && post.uploadedBy !== null
      ? post.uploadedBy._id
      : post.uploadedBy

  const uploaderName =
    typeof post.uploadedBy === 'object' && post.uploadedBy !== null
      ? post.uploadedBy.name
      : 'Anonymous'

  const isOwnerOrAdmin =
    user?._id === uploaderId ||
    user?.id === uploaderId ||
    user?.role === 'admin' ||
    user?.role === 'superadmin'

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await removePost(post._id)
      navigate('/')
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
      >
        &larr; Back
      </button>

      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="bg-gray-100 dark:bg-slate-900 flex items-center justify-center min-h-[350px]">
          <img
            src={post.imageUrl}
            alt={post.caption || 'Post image'}
            className="w-full h-full object-contain max-h-[600px]"
          />
        </div>

        <div className="p-8 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-700 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold text-sm">
                  {uploaderName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-base">{uploaderName}</h3>
                  <p className="text-xs text-gray-400 dark:text-slate-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {post.caption ? (
              <p className="text-gray-800 dark:text-slate-200 text-base leading-relaxed mb-6">
                {post.caption}
              </p>
            ) : (
              <p className="text-gray-400 dark:text-slate-500 italic text-sm mb-6">
                No caption provided for this post.
              </p>
            )}
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <LikeButton postId={post._id} size="md" />

              {isOwnerOrAdmin && (
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={handleDelete}>
                    Delete
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Comment Section */}
      <CommentSection postId={post._id} />

      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)} title="Edit Post">
        <EditPost
          post={post}
          onClose={() => {
            setIsEditing(false)
            fetchSinglePost(post._id).then((p) => p && setPost(p))
          }}
        />
      </Modal>
    </div>
  )
}
