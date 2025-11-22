import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="p-4">
      <Tabs defaultValue="profile">
      <TabsList>
    <TabsTrigger value="profile">Profile</TabsTrigger>
  </TabsList>
      </Tabs>
      <div className="mt-4">
        {children}
      </div>
    </div>
  )
}