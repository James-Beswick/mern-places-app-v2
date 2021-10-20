import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ErrorModal from '../../shared/components/UI/ErrorModal/ErrorModal';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import PlaceList from '../components/PlaceList';

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const { uid } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${uid}`
        );

        setLoadedPlaces(data.places);
      } catch (err) {}
    };
    fetchData();
  }, [sendRequest, uid]);

  const placeDeleteHandler = deletedPlaceId => {
    setLoadedPlaces(prevPlaces =>
      prevPlaces.filter(place => place.id !== deletedPlaceId)
    );
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList
          onDeletePlace={placeDeleteHandler}
          instances={loadedPlaces}
        />
      )}
    </Fragment>
  );
};

export default UserPlaces;
