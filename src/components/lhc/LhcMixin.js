let LhcMixin = {
    data() {
        return {

        }
    },
    created() {

    },
    methods:{
        payoffFormat(val) {
            return (Number(val)/10000).toFixed(3);
        },
        isBtnActived(item) {
            if(!this) return ''
            return _.find(this.betSelectedList, {cid: item.cid}) ? 'active' : '';
        },
        betSelect(item) {
            this.$emit('lhcselectbet', item);
        },
        computeShengXiaoNum(baseIndex, maxBallNum = 50) {
            let res = [[], [], [], [], [], [], [], [], [], [], [], []]
            let baseIndexList = [];

            if (baseIndex == 12) {
                baseIndexList[0] = 0;
                for (let i = 11; i >= 1; i--) {
                    baseIndexList[12 - i] = i
                }
            }
            else if (baseIndex == 1) {
                baseIndexList[0] = 1;
                baseIndexList[1] = 0;

                j = 11
                for (let i = 2; i < 12; i++) {
                    baseIndexList[i] = j
                    j--
                }
            }
            else {
                if (baseIndex + 1 <= 12) {
                    let j = 1
                    for (let i = baseIndex - 1; i >= 0; i--) {
                        baseIndexList[i] = j
                        j++
                    }
                    baseIndexList[baseIndex] = 0

                    j = 11
                    for (let i = baseIndex + 1; i < 12; i++) {
                        baseIndexList[i] = j
                        j--
                    }
                }
            }

            for (let i = 1; i < maxBallNum; i++) {
                for (let j = 0; j < baseIndexList.length; j++) {
                    if (i % 12 == baseIndexList[j]) {
                        if (i < 10) {
                            let item = "0" + i
                            res[j].push(item)
                        }
                        else {
                            res[j].push("" + i)
                        }
                    }
                }
            }
            return res;
        },
        setClickHeight(elem, height) {
            let winw = window.screen.width || window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; // 获取屏幕宽度

            if(winw > 413){ // 大屏幕
                elem.css('height', (height - 190) + 'px') ;
            }else if(winw > 300 && winw < 375){ // 小屏幕
                elem.css('height', (height - 270) + 'px') ;
            }else{
                elem.css('height', (height-310) + 'px') ;
            }
        }
    }
};
export default LhcMixin;
