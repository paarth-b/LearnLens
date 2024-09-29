
// app/layout.js
import { FileProvider } from './FileContext';
import Navbar from '../components/Navbar';


export const metadata = {
  title: 'React App',
  description: 'Web site created with Next.js.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <FileProvider>{children}</FileProvider>
      </body>
    </html>
  );
}

