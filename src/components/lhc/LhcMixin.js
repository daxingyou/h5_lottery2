var LhcMixin = {
    data: function() {
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
        betSelect(item, parentItem) {
            item.parentItem = parentItem
            this.$emit('lhcselectbet', item);
        },
        computeShengXiaoNum(baseIndex) {
            var res = [[], [], [], [], [], [], [], [], [], [], [], []]
            var baseIndexList = [];

            if (baseIndex == 12) {
                baseIndexList[0] = 0;
                for (var i = 11; i >= 1; i--) {
                    baseIndexList[12 - i] = i
                }
            }
            else if (baseIndex == 1) {
                baseIndexList[0] = 1;
                baseIndexList[1] = 0;

                j = 11
                for (var i = 2; i < 12; i++) {
                    baseIndexList[i] = j
                    j--
                }
            }
            else {
                if (baseIndex + 1 <= 12) {
                    var j = 1
                    for (var i = baseIndex - 1; i >= 0; i--) {
                        baseIndexList[i] = j
                        j++
                    }
                    baseIndexList[baseIndex] = 0

                    j = 11
                    for (var i = baseIndex + 1; i < 12; i++) {
                        baseIndexList[i] = j
                        j--
                    }
                }
            }

            for (var i = 1; i < 50; i++) {
                for (var j = 0; j < baseIndexList.length; j++) {
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
    }
};
export default LhcMixin;
