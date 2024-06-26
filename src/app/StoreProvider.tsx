'use client';
import { PersistGate } from 'redux-persist/integration/react';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '../lib/store';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
    const storeRef = useRef<AppStore | null>(null);
    if (!storeRef.current) {
        storeRef.current = makeStore();
    }

    const { store, persistor } = storeRef.current;

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
}
