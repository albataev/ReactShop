import React from 'react';

export default function AvatarCell(props) {
  return <img src={props.value} alt="" width={32} height={32} />;
}

export const avatarColumnProps = {
  maxWidth: 42,
  filterable: false,
  Cell: AvatarCell
};
