import UserInstance from './UserInstance';
import Card from '../../shared/components/UI/Card/Card';

import classes from './UsersList.module.css';

const UsersList = ({ instances }) => {
  if (instances.length === 0) {
    return (
      <div>
        <Card className="center">
          <h2>No Users Found</h2>
        </Card>
      </div>
    );
  } else {
    return (
      <ul className={classes['users-list']}>
        {instances.map(user => (
          <UserInstance
            key={user.id}
            id={user.id}
            img={user.image}
            name={user.name}
            placeCount={user.places.length}
          />
        ))}
      </ul>
    );
  }
};

export default UsersList;
