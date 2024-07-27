import { Link, Redirect } from 'expo-router';
import { useState } from 'react';

export default function Root() {
    const [isAdmin, setIsAdmin] = useState(true);
    console.log(`in the app root is ${isAdmin}`)
    return (
        <>
            {isAdmin ?
                <Redirect href={"/(protected)/(admin)/home"} /> :
                <Redirect href={"/(protected)/(user)/home"} />
            }
        </>
    );
}
