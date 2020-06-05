export function getArgs(strParame) {
    const args = {};
    let query;
    // eslint-disable-next-line prefer-rest-params
    if (arguments.length === 2) { [query] = arguments; } else { query = window.location.search.substring(1); }
    const pairs = query.split('&');
    for (let i = 0; i < pairs.length; i += 1) {
      const pos = pairs[i].indexOf('=');
      // eslint-disable-next-line no-continue
      if (pos === -1) continue;
      const argname = pairs[i].substring(0, pos);
      let value = pairs[i].substring(pos + 1);
      value = decodeURIComponent(value);
      args[argname] = value;
    }
    return args[strParame];
  }
  
  export function format_date(num=0,format = 'YY-MM-DD hh:mm:ss'){
    let date = new Date(Number(num));
    let year = date.getFullYear(),
        month = date.getMonth()+1,//月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
    
    let preArr = Array.apply(null,Array(10)).map(function(elem, index) {
        return '0'+index;
    });////开个长度为10的数组 格式为 00 01 02 03

    let newTime = format.replace(/YY/g,year)
                        .replace(/MM/g,preArr[month]||month)
                        .replace(/DD/g,preArr[day]||day)
                        .replace(/hh/g,preArr[hour]||hour)
                        .replace(/mm/g,preArr[min]||min)
                        .replace(/ss/g,preArr[sec]||sec);

    return newTime;
  }