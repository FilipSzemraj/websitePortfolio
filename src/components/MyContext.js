import React, { createContext, useState, useContext, useRef, useEffect } from 'react';

const ActiveProjectContext = createContext();

export function useActiveProject() {
    return useContext(ActiveProjectContext);
}

export const ActiveProjectProvider = ({ children }) => {
    const [activeProject, setActiveProject] = useState(0);
    const [matches, setMatches] = useState(window.matchMedia("(min-width: 992px)").matches);
    const matchesRef = useRef(matches);

    useEffect(() => {
        const handler = e => {
            setMatches(e.matches);
            matchesRef.current = e.matches;
        };

        const mediaQuery = window.matchMedia("(min-width: 1025px)");
        mediaQuery.addEventListener('change', handler);

        return () => {
            mediaQuery.removeEventListener('change', handler);
        };
    }, []);

    const value = { activeProject, setActiveProject, matches, matchesRef };

    return (
        <ActiveProjectContext.Provider value={value}>
            {children}
        </ActiveProjectContext.Provider>
    );
};