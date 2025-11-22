import { createClient } from "@/utils/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldContent, FieldLabel } from "@/components/ui/field"
import { CopyableInput } from "@/components/ui/copyable-input"

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: { session } } = await supabase.auth.getSession()

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Field>
              <FieldLabel>Email</FieldLabel>
              <FieldContent>
                <CopyableInput
                  type="email"
                  value={user?.email || ""}
                  className="bg-muted"
                />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel>Access Token</FieldLabel>
              <FieldContent>
                <CopyableInput
                  type="text"
                  value={session?.access_token || ""}
                  className="bg-muted font-mono text-xs"
                />
              </FieldContent>
            </Field>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}