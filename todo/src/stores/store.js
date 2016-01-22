import Reflux from 'reflux'
import actions from '../actions/actions'

//给数组添加remove方法，用于去除指定下标的元素
var num=0;
Array.prototype.remove=function(dx)
{
    if(isNaN(dx)||dx>this.length){return false;}
    for(var i=0,n=0;i<this.length;i++)
    {
        if(this[i]!=this[dx])
        {
            this[n++]=this[i]
        }
    }
    this.length-=1
};
export default Reflux.createStore({
    //此处是初始数据，若通过db走后台，则该处是http请求获取数据
    items:[{name:"周杰伦"},{name:"陈奕迅"}],
    //监听所有的actions
    listenables: [actions],
    //on开头的都是action触发后的回调函数
    onGetAll () {
        //更新状态（就是个对象）
        this.trigger({list:this.items});
    },
    onAdd(item){
    //处理没有输入用户名的情况。并且纪录序号佚名  
        if(item==''){
            this.items.push({name:(++num)+"佚名"});
        }
        else{
            //插入数据
            this.items.push({name:item});
        }    
        this.trigger({list:this.items});
    },
    onRemove(i){
        //删除数据
        this.items.remove(i);
        this.trigger({list:this.items});
    },
    onModify(i,item){
        this.items[i].name=item;
        this.trigger({list:this.items});
    }
});