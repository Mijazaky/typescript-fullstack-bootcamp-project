import { createFileRoute } from '@tanstack/react-router';
import { BookInfo } from '../components/Product'; // Import your BookInfo component

// Define the route for the root ('/') path
export const Route = createFileRoute('/')({
  component: Index,
});

// Render the BookInfo component inside the Index function
function Index() {
  return <BookInfo />;
}