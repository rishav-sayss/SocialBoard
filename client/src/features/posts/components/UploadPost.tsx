import React, { useState, ChangeEvent, FormEvent } from 'react'
import { usePosts } from '../hooks/usePosts'
import { Button } from '../../../shared/components/Button'

interface UploadPostProps {
  onSuccess?: () => void
}

export const UploadPost: React.FC<UploadPostProps> = ({ onSuccess }) => {
  const { createPost, error: postError, clearError } = usePosts()

  const [caption, setCaption] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0]
      setFile(selected)
      setPreview(URL.createObjectURL(selected))
      setFormError(null)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setFormError(null)
    clearError()

    if (!file) {
      setFormError('Please select an image file to upload.')
      return
    }

    try {
      setIsSubmitting(true)
      const formData = new FormData()
      formData.append('image', file)
      if (caption.trim()) {
        formData.append('caption', caption.trim())
      }

      await createPost(formData)
      setCaption('')
      setFile(null)
      setPreview(null)
      if (onSuccess) onSuccess()
    } catch {
      // Error handled by store
    } finally {
      setIsSubmitting(false)
    }
  }

  const errorMessage = formError || postError

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-100 dark:border-slate-700 shadow-lg">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Create New Post</h2>

      {errorMessage && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-slate-300 mb-2">
            Upload Image
          </label>
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-2xl p-6 bg-gray-50 dark:bg-slate-900/40 hover:bg-gray-100 dark:hover:bg-slate-900 transition-colors cursor-pointer relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="max-h-56 rounded-xl object-cover shadow-sm"
              />
            ) : (
              <div className="text-center">
                <span className="text-3xl block mb-2">🖼️</span>
                <p className="text-sm font-semibold text-gray-700 dark:text-slate-300">
                  Click or drag image to upload
                </p>
                <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">PNG, JPG, WEBP up to 10MB</p>
              </div>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="caption" className="block text-xs font-semibold uppercase text-gray-600 dark:text-slate-300 mb-1.5">
            Caption
          </label>
          <textarea
            id="caption"
            rows={3}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write a caption for your post..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm resize-none"
          />
        </div>

        <Button type="submit" isLoading={isSubmitting} className="w-full">
          Upload Post
        </Button>
      </form>
    </div>
  )
}
