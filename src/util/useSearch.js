import {reactive, ref, shallowRef} from "vue";

const useSearch = ( fun, sortRule = null, type = "common") => {
  let oldRows = null;
  const rows = shallowRef([]);
  const pagination = reactive({
    page: 1,
    pageSize: 10,
    totalCount: 0,
    totalPage: 0,
  });

  const searching = ref(false);
  let searchData = {};

  const onSort = ({key,status}) => {
    if(!rows.value.length) return null;
    Object.keys(sortRule).map( sortKey => {
      if(key===sortKey){
        sortRule[key]['status'] = status;
        if(status){
          rows.value = JSON.parse(JSON.stringify(oldRows)).sort(sortRule[key]['sortMethod'][status])
        }else{
          rows.value = oldRows;
        }
      }else{
        sortRule[sortKey]['status'] = 0;
      }
    })
  }
  const getList = () => {
    searching.value = true;
    if (type === 'common') {
      fun(searchData)
        .then((res) => {
          const {results, totalCount, totalPage} = res;
          oldRows = JSON.parse(JSON.stringify(results));
          if(sortRule){
            const arr = Object.values(sortRule);
            const findItem = arr.find(el=> el['status']);
            if(findItem){
              if(findItem['status']){
                rows.value = results.sort(findItem['sortMethod'][findItem['status']]);
              }else{
                rows.value = oldRows;
              }
            }else{
              rows.value = results;
            }
          }else{
            rows.value = results;
          }
          pagination.totalCount = totalCount;
          pagination.totalPage = totalPage;
        })
        .catch(() => {
        })
        .finally(() => {
          searching.value = false;
        });
    } else if(type==='custom') {
      fun(searching,rows,pagination,)
    }
  };
// 搜索回调
  const onSearch = (val) => {
    pagination.page = 1;
    searchData = {
      ...val,
      page: 1,
      pageSize: pagination.pageSize,
    };
    getList();
  };
// 表格pagination改变回调
  const onPageChange = (val) => {
    const {pageSize, page} = val;
    page && (pagination.page = page);
    pageSize && (pagination.pageSize = pageSize);
    searchData && (searchData = {...searchData, ...val});
    getList();
  };

  return {
    searching,
    searchData,
    rows,
    pagination,
    onSearch,
    onPageChange,
    onSort,
    getList,
  }
}

export default useSearch;
