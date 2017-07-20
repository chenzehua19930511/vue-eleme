export function saveToLocal(id, key, value) {
  let seller = localStorage.getItem("seller");
  if (!seller) {
    seller = {};
    seller[id] = {};
  }
  else{
    seller = JSON.parse(seller);
    if (!seller[id]) {
      seller[id] = {};
    }
  }
  seller[id][key] = value;
  localStorage.setItem("seller",JSON.stringify(seller));
}

export function loadFromLocal(id, key, def) {
  let seller = localStorage.getItem("seller");
  if (!seller) {
    return def;
  }
  seller = JSON.parse(seller)[id];
  if (!seller) {
    return def;
  }
  return seller[key] || def;
}
