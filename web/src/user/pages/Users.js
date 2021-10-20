import React, { Fragment, useEffect, useState } from 'react';

import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UI/ErrorModal/ErrorModal';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner/LoadingSpinner';
import UsersList from '../components/UsersList';
import Card from '../../shared/components/UI/Card/Card';

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState(undefined);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users`
        );

        setLoadedUsers(data.users);
      } catch (err) {}
    };

    fetchUsers();
  }, [sendRequest]);

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {/* <Card styles={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <h2>Welcome</h2>
        </div>
        <div>
          <p>
            Share your favourite locations with people from all over the world!
          </p>
        </div>
      </Card> */}
      {!isLoading && loadedUsers && <UsersList instances={loadedUsers} />}
    </Fragment>
  );
};

export default Users;
