'use client'

import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';

export default function SidebarWrapper() {
  const pathname = usePathname();
  const isFeaturesPage = pathname === '/features';
  const isHomePage = pathname === '/';
  const isCommunityPage = pathname === '/community';

  if (isFeaturesPage) {
    return null;
  }
  if (isHomePage) {
    return null;
  }
  if (isCommunityPage) {
    return null;
  }

  return <Sidebar />;
}