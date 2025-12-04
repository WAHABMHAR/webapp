import React, { memo, useMemo, useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from '@/hooks/useAuth';
import { FaHome, FaUserShield } from '@assets/icons';
import { userLogout } from '@/redux/slices/authSlice';

export type AdminSidebarProps = { isOpen: boolean; onClose: () => void };

const AdminSidebar: React.FC<AdminSidebarProps> = memo(({ isOpen, onClose }) => {
    const { role, user } = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const links = useMemo(() => {
        const base = [{ to: '/admin', label: 'Dashboard', icon: <FaHome /> }];
        if (role === 'admin' || role === 'manager') {
            base.push({ to: '/admin/users', label: 'Users', icon: <FaUserShield /> });
        }
        return base;
    }, [role]);

    const logout = useCallback(() => {
        dispatch(userLogout());
        navigate('/login');
    }, [dispatch, navigate]);

    return (
        <aside
            className={
                `fixed inset-y-0 left-0 w-sidebar bg-sidebar text-white flex flex-col transition-transform duration-200 md:translate-x-0 z-40 ` +
                (isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0')
            }
            onClick={onClose}
        >
            <div className="p-4 border-b border-white/10">
                <h2 className="text-xl font-semibold">Admin</h2>
                <p className="text-xs text-white/70 mt-1">{role ? role.toUpperCase() : 'GUEST'}</p>
            </div>
            <nav className="flex-1 overflow-y-auto p-2 space-y-1">
                {links.map((l) => (
                    <NavLink
                        key={l.to}
                        to={l.to}
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-3 py-2 rounded transition-colors ` +
                            (isActive ? 'bg-white/15' : 'hover:bg-white/10')
                        }
                    >
                        {l.icon}<span>{l.label}</span>
                    </NavLink>
                ))}
            </nav>
            <div className="p-4 border-t border-white/10">
                <div className="flex items-center gap-3 mb-3">
                    <div className="h-8 w-8 rounded-full bg-white/20" />
                    <div className="text-sm">
                        <div className="font-medium">{user?.name || 'User'}</div>
                        <div className="text-white/70">{user?.email || 'user@example.com'}</div>
                    </div>
                </div>
                <button onClick={logout} className="w-full text-left text-red-300 hover:text-red-200 text-sm">Logout</button>
            </div>
        </aside>
    );
});

export default AdminSidebar;


