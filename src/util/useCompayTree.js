import { COMPANY } from "src/api/module.js";
import { ref, shallowRef } from "vue";
export const useCompanyTree = () => {
  const treeLoading = ref(true);
  const treeNode = shallowRef([]);
  const treeList = shallowRef([]);
  const companyOptions = shallowRef(null);
  const formatTree = (nodes, arr, list) => {
    !arr && (arr = []);
    !list && (list = []);
    nodes.forEach((el) => {
      const { id, pid, companyName, children } = el;
      list.push({ id, pid, label: companyName });
      const item = { id, pid, label: companyName };
      if (children) {
        item.children = [];
        formatTree(children, item.children, list);
      }
      arr.push(item);
    });
    return {
      arr,
      list,
    };
  };
  const flaTree = (arr,newArr = []) => {
    arr.forEach((el) => {
      const {children,...param} = el;
      newArr.push(param);
      if(children){
        flaTree(children,newArr)
      }
    })
    return newArr;
  }
  COMPANY.treeList({})
    .then((res) => {
      const newArr = flaTree(res ? [res] : []);
      companyOptions.value = newArr.map(el => {
        const {companyName, id,pid} = el;
        return {
          label: companyName,
          value: id,
          pid
        }
      })
      const { arr, list } = formatTree([res]);
      treeNode.value = arr;
      treeList.value = list;
    })
    .finally(() => {
      treeLoading.value = false;
    });

  return {
    treeLoading,
    treeNode,
    treeList,
    companyOptions,
  };
};
