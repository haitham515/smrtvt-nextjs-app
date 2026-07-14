import Link from 'next/link';
import { IconUserCircle } from '@tabler/icons-react';

export default function ProfileButton() {
  return (
    <Link
      href="/api/profile"
      className="flex flex-row items-center gap-2 bg-gray-800 text-white font-bold py-2 px-4 rounded hover:bg-gray-900 active:bg-black focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition-colors w-fit"
    >
      <IconUserCircle size={18} />
      <span>Profile</span>
    </Link>
  );
}