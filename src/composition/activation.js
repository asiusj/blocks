import {
    ref,
    computed
} from "@vue/composition-api";
import store from "@/plugins/store";

const activation = () => {

    const activationInProcess = ref(false)
    const timer = ref(null)


    const activationProcess = computed(
        () => {
            return store.getters.getActivationProcess;
        }
    )

    const desktopParams = computed(
        () => {
            return store.getters.getDesktopParams;
        }
    )

    const stopActivation = () => {
        if (activationProcess.value.status)
            store.dispatch("setActivationStatus", {
                status: false,
                block: null,
                position: {
                    x: null,
                    y: null
                }
            });
    }

    const startActivation = (block, e) => {
        if (e.button) return;
        activationInProcess.value = true;
        timer.value = setTimeout(() => {
            var x = e.clientX;
            var y = e.clientY;
            if (e.touches) {
                x = e.touches[e.touches.length - 1].clientX;
                y = e.touches[e.touches.length - 1].clientY;
            }

            store.dispatch("setActivationStatus", {
                status: true,
                block,
                position: {
                    x,
                    y
                }
            });
        }, 1000);
    }

    const abortActivation = () => {
        clearTimeout(timer.value);
        activationInProcess.value = false;
    }

    const activateBlock = () => {
        if (activationProcess.value.status) {
            const id = `b${activationProcess.value.block.width}${activationProcess.value.block.height}${activationProcess.value.block.count}`;
            store.dispatch("activateBlock", {
                ...activationProcess.value.block,
                id
            });
        }
    }

    const activationDispatch = (e) => {
        if (!activationProcess.value.status) {
            abortActivation();
            return;
        }
        let desktopPosition = desktopParams.value.object.getBoundingClientRect();
        let pointX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
        let pointY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
        if (
            pointX > desktopPosition.left &&
            pointX < desktopParams.value.object.offsetWidth + desktopPosition.left &&
            pointY > desktopPosition.top &&
            pointY < desktopParams.value.object.offsetHeight + desktopPosition.top
        ) {
            activateBlock();
            stopActivation();
            abortActivation();
        } else {
            stopActivation();
        }
    }

    const deleteBlock = (id) => {
        store.dispatch("deleteBlock", id);
    }

    return {
        activationInProcess,
        timer,
        activationProcess,
        desktopParams,
        stopActivation,
        startActivation,
        abortActivation,
        activateBlock,
        activationDispatch,
        deleteBlock
    }
}

export default activation