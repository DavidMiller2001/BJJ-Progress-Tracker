'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"

// This would typically come from a database or API
const allEvents = [
  { id: 1, type: 'training', date: '2023-06-15', notes: 'Worked on guard retention' },
  { id: 2, type: 'competition', date: '2023-07-01', name: 'Summer BJJ Tournament' },
  { id: 3, type: 'training', date: '2023-07-20', notes: 'Focus on takedowns' },
  { id: 4, type: 'competition', date: '2023-08-15', name: 'Local BJJ Open' },
  { id: 5, type: 'training', date: '2023-08-22', notes: 'Guard passing techniques' },
  { id: 6, type: 'competition', date: '2023-09-22', name: 'State Championships' },
  { id: 7, type: 'training', date: '2023-10-05', notes: 'Submission drills' },
  { id: 8, type: 'competition', date: '2023-11-05', name: 'National Tournament' },
];

const EventList = ({ events }: { events: typeof allEvents }) => (
  <ul className="space-y-4">
    {events.map((event) => (
      <li key={event.id} className="flex items-center space-x-4">
        <Badge variant={event.type === 'training' ? 'secondary' : 'destructive'}>
          {event.type === 'training' ? 'Training' : 'Competition'}
        </Badge>
        <div>
          <p className="font-semibold">{new Date(event.date).toLocaleDateString()}</p>
          <p>{event.type === 'training' ? event.notes : event.name}</p>
        </div>
      </li>
    ))}
  </ul>
)

export default function UpcomingEvents() {
  const [activeTab, setActiveTab] = useState('upcoming')
  const currentDate = new Date()

  const pastEvents = allEvents
    .filter(event => new Date(event.date) < currentDate)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const upcomingEvents = allEvents
    .filter(event => new Date(event.date) >= currentDate)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return (
    <Card>
      <CardHeader>
        <CardTitle>BJJ Events</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            {upcomingEvents.length > 0 ? (
              <EventList events={upcomingEvents} />
            ) : (
              <p>No upcoming events scheduled.</p>
            )}
          </TabsContent>
          <TabsContent value="past">
            {pastEvents.length > 0 ? (
              <EventList events={pastEvents} />
            ) : (
              <p>No past events recorded.</p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

