'use client'
import React from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {usePathname} from "next/navigation";

interface TopNavProps {
  
}


const TopNav: React.FC<TopNavProps> = ({  }) => {
  const pathname = usePathname();
  console.log(`pathname: ${pathname}`)
  const isActive = (path: string) => pathname === path;

  return (
    <div>
      <div className="flex gap-2">
        <Link href='/image'>
          <Button variant={isActive('/image') ? 'default' : 'secondary'}>
            Image
          </Button>
        </Link>
        <Link href='/protected'>
          <Button variant={isActive('/protected') ? 'default' : 'secondary'}>
            Upload
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TopNav;
