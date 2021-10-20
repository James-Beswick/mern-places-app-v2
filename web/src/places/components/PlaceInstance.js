import { Fragment, useState, useContext } from 'react';

import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import Button from '../../shared/components/FormElements/Button/Button';
import Card from '../../shared/components/UI/Card/Card';
import Modal from '../../shared/components/UI/Modal/Modal';
import Map from '../../shared/components/Map/Map';
import ErrorModal from '../../shared/components/UI/ErrorModal/ErrorModal';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner/LoadingSpinner';

import classes from './PlaceInstance.module.css';

const PlaceInstance = props => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const authCtx = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  console.log(authCtx.userId);
  console.log(props.creatorID);
  console.log('end');

  const toggleMapHandler = () => {
    setShowMap(!showMap);
  };

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${props.id}`,
        'DELETE',
        null,
        { Authorization: 'Bearer ' + authCtx.token }
      );
      props.onDelete(props.id);
    } catch (err) {}
  };
  const areYouSureFooter = (
    <Fragment>
      <Button onClick={cancelDeleteHandler} inverse>
        CANCEL
      </Button>
      <Button onClick={confirmDeleteHandler} danger>
        DELETE
      </Button>
    </Fragment>
  );

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={toggleMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={toggleMapHandler}>CLOSE</Button>}
      >
        <div className={classes['map-container']}>
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={areYouSureFooter}
      >
        <p>Do you wish to delete this place? This action cannot be undone!</p>
      </Modal>
      <li classes={classes['place-item']}>
        <Card className={classes['place-item__content']}>
          {isLoading && <LoadingSpinner asOverlay />}
          <div className={classes['place-item__image']}>
            <img
              src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
              alt={props.title}
            />
          </div>
          <div className={classes['place-item__info']}>
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className={classes['place-item__actions']}>
            <Button onClick={toggleMapHandler} inverse>
              VIEW ON MAP
            </Button>
            {authCtx.userId === props.creatorID && (
              <Button to={`/places/${props.id}`}>EDIT</Button>
            )}
            {authCtx.userId === props.creatorID && (
              <Button onClick={showDeleteWarningHandler} danger>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </Fragment>
  );
};

export default PlaceInstance;
