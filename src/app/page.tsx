import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function HomePage() {
  return (
    <main className="flex items-center justify-center p-8">
      <div className="w-screen max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle>Test Card</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              <li>this is a sample list item</li>
              <li>this is a sample list item</li>
              <li>this is a sample list item</li>
              <li>this is a sample list item</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
