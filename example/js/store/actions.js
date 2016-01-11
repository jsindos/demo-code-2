export const Actions = {
  CHANGE_DATA: 'CHANGE_DATA',
  RENDER_DATA: 'RENDER_DATA',
};

export function changeData() {
  return {
    type: Actions.CHANGE_DATA,
  };
}

export function renderData(data) {
  return {
    type: Actions.RENDER_DATA,
    data: data,
  };
}
