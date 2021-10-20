import { Link } from 'react-router-dom';
import Card from '../../shared/components/UI/Card/Card';
import Avatar from '../../shared/components/UI/Avatar/Avatar';

import classes from './UserInstance.module.css';

const UserInstance = ({ id, img, name, placeCount }) => {
  return (
    <li className={classes['user-item']}>
      <Card className={classes['user-item__content']}>
        <Link to={`/${id}/places`}>
          <div className={classes['user-item__image']}>
            <Avatar
              image={`${process.env.REACT_APP_ASSET_URL}/${img}`}
              alt={name}
            />
          </div>
          <div className={classes['user-item__info']}>
            <h2>{name}</h2>
            <h3>
              {placeCount} {placeCount === 1 ? 'Place' : 'Places'}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserInstance;
