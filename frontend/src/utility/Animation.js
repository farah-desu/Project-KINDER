export const Slideright=(delay=0)=>{
    return {
        hidden:{
            opacity :0,
            x:-100,
        },
        visible:{
            opeacity:1,
            x:0,
            transition:{
                duration:0.5,
                delay:delay,
            },
        },
    };
};