import React from 'react';
import escapeRegExp from 'lodash/escapeRegExp';

const style = {
  backgroundColor: '#FFFF88',
  color: '#FF0000'
};

export function matchHighlight(match, value) {
  const _match = match.toLowerCase();

  const parts = match.length
    ? value.split(new RegExp(`(${escapeRegExp(match)})`, 'ig'))
    : [value];

  return (
    <React.Fragment>
      {parts.map(
        (part, index) => part && part.toLowerCase() === _match ? (
          <span key={index} style={style}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </React.Fragment>
  );
}

export default function HighlightCell(props) {
  const { column, columnProps, value } = props;
  const item = columnProps.rest.filtered
        && columnProps.rest.filtered.find(x => x.id === column.id);

  const match = (item && item.value) || '';
  return matchHighlight(match, value);
}
