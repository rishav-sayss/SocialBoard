import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Post } from '../../../shared/types/post.types'
import { usePosts } from '../hooks/usePosts'
import { Button } from '../../../shared/components/Button'

interface EditPostProps {
  post: Post
  onClose: () => void
}

export const EditPost: React.FC<EditPostProps> = ({ post, onClose }) => {
  const { editPost } = usePosts()
  const [caption, setCaption] = useState(post.caption || '')
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>(post.imageUrl)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0]
      setFile(selected)
      setPreview(URL.createObjectURL(selected))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      setIsSubmitting(true)
      const formData = new FormData()
      formData.append('caption', caption)
      if (file) {
        formData.append('image', file)
      }
      await editPost(post._id, formData)
      onClose()
    } catch (err: any) {
      setError(err.message || 'Failed to update post.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-slate-300 mb-2">
          Image
        </label>
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-slate-700">
          <img src={preview} alt="Post preview" className="w-full h-full object-cover" />
          <label className="absolute bottom-3 right-3 bg-black/70 hover:bg-black text-white text-xs font-semibold px-3 py-1.5 rounded-xl cursor-pointer backdrop-blur-md transition-colors">
            Replace Image
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="edit-caption" className="block text-xs font-semibold uppercase text-gray-600 dark:text-slate-300 mb-1.5">
          Caption
        </label>
        <textarea
          id="edit-caption"
          rows={3}
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50 text-gray-900 dark:text-white placeholder:text-gray-400 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <Button type="button" variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          Save Changes
        </Button>
      </div>
    </form>
  )
}
