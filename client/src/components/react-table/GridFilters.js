import HighlightCell from './HighlightCell';

function containsInsensitive(filter, row) {
  return (
    row[filter.id] == null
        || String(row[filter.id])
          .toLowerCase()
          .includes(filter.value.toLowerCase())
  );
}

function getFiltered(gridState) {
  return { filtered: gridState.filtered };
}

export default {
  Cell: HighlightCell,
  filterable: true,
  filterMethod: containsInsensitive,
  getProps: getFiltered
};
