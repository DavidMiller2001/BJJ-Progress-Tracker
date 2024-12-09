'use client'

import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'

export default function TrainingSessionForm() {
  const [date, setDate] = useState('')
  const [notes, setNotes] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically save the training session data and update the calendar
    console.log('Training session saved:', { date, notes })
    setDate('')
    setNotes('')
  }

  return (
    <div className="border rounded-lg p-4 mb-6">
      <h2 className="text-2xl font-semibold mb-4">Add Training Session to Calendar</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <Input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
            Notes
          </label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="Enter your training notes here..."
            required
          />
        </div>
        <Button type="submit">Add to Calendar</Button>
      </form>
    </div>
  )
}

