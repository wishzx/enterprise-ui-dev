import { test, expect, vi } from 'vitest';
import { log } from './log';

//segment, sentry requestFromApi('/') named endpoint to get error
//if you mock and spy code you control , fix your code
vi.mock('./your/code/somewhere');
vi.mock('axios');
vi.mock('react-redux', (args)=>{
    return {
        useDispatch() {},
        useSelector() {}
    } 
});



test('it spies on the multiply method', ()=>{
    const mock = vi.fn((x?: string)=>{if(x){return x.repeat(3)}});

    const spy = vi.spyOn(console, 'log').mockImplementation(()=>{});

    log('log', 1,2,3)

    mock();
    mock();
    const result = mock("wow");
    
    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith("wow");
    expect(console.log).toHaveBeenCalledWith(1,2,3);
    
    //geolocation , time , battery , browser api . If low battery don't use worker
    

    expect(result).toMatchInlineSnapshot('"wowwowwow"');

});
