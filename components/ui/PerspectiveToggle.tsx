import React from 'react';
import { motion } from 'framer-motion';
import { usePerspective } from '../../context/PerspectiveContext';
import { Building2, Users } from 'lucide-react';

export const PerspectiveToggle = () => {
    const { perspective, togglePerspective } = usePerspective();

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePerspective}
            className={`fixed bottom-4 left-4 md:bottom-8 md:left-8 z-50 flex items-center gap-3 px-5 md:px-6 py-3 rounded-full shadow-2xl backdrop-blur-md border transition-all duration-300 ${perspective === 'banker'
                    ? 'bg-slate-900/90 border-cyan-500/50 text-cyan-400 shadow-cyan-900/20'
                    : 'bg-rose-950/90 border-rose-500/50 text-rose-400 shadow-rose-900/20'
                }`}
        >
            <div className="relative w-6 h-6">
                <motion.div
                    initial={false}
                    animate={{ opacity: perspective === 'banker' ? 1 : 0, scale: perspective === 'banker' ? 1 : 0.5 }}
                    className="absolute inset-0"
                >
                    <Building2 className="w-6 h-6" />
                </motion.div>
                <motion.div
                    initial={false}
                    animate={{ opacity: perspective === 'customer' ? 1 : 0, scale: perspective === 'customer' ? 1 : 0.5 }}
                    className="absolute inset-0"
                >
                    <Users className="w-6 h-6" />
                </motion.div>
            </div>
            <span className="font-bold tracking-wide text-sm uppercase">
                {perspective === 'banker' ? 'Corporate View' : 'Consumer View'}
            </span>
        </motion.button>
    );
};
