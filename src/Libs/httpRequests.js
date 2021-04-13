export async function getUserByUsername(URL, username, onSuccess, onFail) {
  try {
    const res = await fetch(`${URL}/users?username=${username}`);
    const data = await res.json();
    onSuccess(data);
  } catch {
    onFail();
  }
}

export async function getGroupById(URL, groupId, onSuccess) {
  try {
    const res = await fetch(`${URL}/groups/${groupId}`);
    const data = await res.json();
    onSuccess(data);
  } catch (error) {
    console.log(error);
  }
}

export async function getGroupByName(URL, groupName, onSuccess, onFail) {
  try {
    const res = await fetch(`${URL}/groups?name=${groupName}`);
    const data = await res.json();
    onSuccess(data[0]);
  } catch {
    onFail();
  }
}

export async function getEventById(URL, eventId) {
  try {
    const res = await fetch(`${URL}/events/${eventId}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getManyEventsByIds(URL, ids = [], onSuccess) {
  try {
    const events = await Promise.all(ids.map((id) => getEventById(URL, id)));
    onSuccess(events);
  } catch (error) {
    console.log(error);
  }
}

export async function postUser(URL, user, onSuccess) {
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    };
    const response = await fetch(`${URL}/users`, requestOptions);
    const data = await response.json();
    onSuccess(data);
  } catch (error) {
    console.log(error);
  }
}

export async function postGroup(URL, group, onSuccess) {
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(group),
    };
    const response = await fetch(`${URL}/groups`, requestOptions);
    const data = await response.json();
    onSuccess(data);
  } catch (error) {
    console.log(error);
  }
}

export async function postEvent(URL, event, onSuccess) {
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    };
    const response = await fetch(`${URL}/events`, requestOptions);
    const data = await response.json();
    onSuccess(data);
  } catch (error) {
    console.log(error);
  }
}

export async function getEventsByGroupId(URL, groupId, onSuccess) {
  try {
    const res = await fetch(`${URL}/events?groupid=${groupId}`);
    const data = await res.json();
    onSuccess(data);
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(URL, id, user, onSuccess) {
  try {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    };
    const response = await fetch(`${URL}/users/${id}`, requestOptions);
    const data = await response.json();
    onSuccess(data);
  } catch (error) {
    console.log(error);
  }
}

export async function getAddress(URL, lat, lng, onSuccess) {
  try {
    const response = await fetch(
      `${URL}/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
    );
    const data = await response.json();
    onSuccess({
      road: data.address.road,
      city: data.address.city,
      postcode: data.address.postcode,
    });
  } catch (error) {
    console.log(error);
  }
}
