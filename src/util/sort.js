export const StringAscByKey = (key) => {
  return (a, b) => (a[key] || '').localeCompare(b[key] || '', 'zh')
}

export const StringDescByKey = (key) => {
  return (a, b) => (b[key] || '').localeCompare(a[key] || '', 'zh')
}

export const StringTimeAscByKey = (key) => {
  return (a, b) => {
    const valueA = a[key];
    const valueB = b[key];
    if(!valueA){
      return 1;
    }
    if(!valueB){
      return -1;
    }
    if(valueA === valueB){
      return 0;
    }
    return Date.parse(valueA) - Date.parse(valueB);
  }
}

export const StringTimeDescByKey = (key) => {
  return (a, b) => {
    const valueA = a[key];
    const valueB = b[key];
    if(!valueA){
      return -1;
    }
    if(!valueB){
      return 1;
    }
    if(valueA === valueB){
      return 0;
    }
    return Date.parse(valueB) - Date.parse(valueA);
  }
}
