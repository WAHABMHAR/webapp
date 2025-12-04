import React, { memo } from 'react';
import { Menu } from 'lucide-react';

export type AdminTopbarProps = { onMenu: () => void };

const AdminTopbar: React.FC<AdminTopbarProps> = memo(({ onMenu }) => (
    <div className="fixed top-0 left-0 md:left-sidebar right-0 h-topbar bg-topbar border-b flex items-center px-4 md:px-6 z-30">
        <button className="md:hidden mr-3" onClick={onMenu}><Menu size={20} /></button>
        <span className="font-medium">Admin Panel</span>
    </div>
));

export default AdminTopbar;


