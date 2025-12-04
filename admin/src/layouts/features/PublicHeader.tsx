import React, { memo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Search } from '@assets/icons';

const PublicHeader: React.FC = memo(() => {
    const navigate = useNavigate();
    const go = useCallback((to: string) => () => navigate(to), [navigate]);
    return (
        <header className="h-topbar sticky top-0 z-40 border-b bg-topbar/90 backdrop-blur">
            <div className="max-w-6xl mx-auto h-topbar px-4 flex items-center gap-4">
                <button onClick={go('/')} className="font-semibold">Home</button>
                <button onClick={go('/about')}>About</button>
                <button onClick={go('/contact')}>Contact</button>
                <div className="ml-auto flex items-center gap-3 text-gray-600">
                    <Search size={18} />
                    <Bell size={18} />
                    <Link to="/login" className="text-blue-600">Login</Link>
                </div>
            </div>
        </header>
    );
});

export default PublicHeader;


