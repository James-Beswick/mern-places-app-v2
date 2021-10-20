import Card from '../../shared/components/UI/Card/Card';
import PlaceInstance from './PlaceInstance';
import Button from '../../shared/components/FormElements/Button/Button';

import classes from './PlaceList.module.css';

const PlaceList = props => {
  if (props.instances.length === 0) {
    return (
      <div className={`${classes['place-list']} center`}>
        <Card>
          <h2>No Places Found</h2>
          <p>
            You can share your own favourite locations by clicking on the button
            below!
          </p>
          <Button to="/places/new">SHARE PLACE</Button>
        </Card>
      </div>
    );
  } else {
    return (
      <ul className={classes['place-list']}>
        {props.instances.map(instance => (
          <PlaceInstance
            key={instance.id}
            id={instance.id}
            title={instance.title}
            image={instance.image}
            description={instance.description}
            address={instance.address}
            creatorID={instance.creator}
            coordinates={instance.location}
            onDelete={props.onDeletePlace}
          />
        ))}
      </ul>
    );
  }
};

export default PlaceList;
