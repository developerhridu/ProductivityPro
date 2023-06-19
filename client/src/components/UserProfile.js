import React, { useEffect, useState } from 'react';
import { UserProfileRequest } from '../APIRequest/APIRequest';

const UserProfile = () => {
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await UserProfileRequest();
                setUserProfile(user);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container mt-5 col-xl-6">
            <h1>User Profile</h1>
            {userProfile ? (
                <table className="table table-striped">
                    <thead className="thead-dark">
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{userProfile.firstName}</td>
                        <td>{userProfile.lastName}</td>
                        <td>{userProfile.email}</td>
                    </tr>
                    </tbody>
                </table>
            ) : (
                <p>Loading user profile...</p>
            )}
        </div>
    );
};

export default UserProfile;
