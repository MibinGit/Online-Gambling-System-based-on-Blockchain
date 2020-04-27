pragma solidity ^0.5.16;

contract gambling0 {
    uint lottery = 1 ether;
    address payable creater;
    uint maxRange = 10;
    uint pool = 0;
    bool lock = false;
    uint win = 0;
    mapping(uint => address payable[]) public list;


    constructor() public {
        creater = msg.sender;
    }

    event LogUint(address, uint);
//    function log(address  s , uint x) internal {
//        emit LogUint(s, x);
//    }

    modifier unlock(){
        require(lock == false);
        _;
    }

    function bet(uint num) public payable unlock {
        require(msg.value >= lottery);
        list[num % maxRange].push(msg.sender);
        emit LogUint(msg.sender,num % maxRange);
        pool += lottery;
    }


    modifier onlyCreater() {
        require(msg.sender == creater);
        _;
    }

    /*
    function __callback(bytes32 _queryId, string _result, bytes _proof) {
        require(msg.sender != oraclize_cbAddress());
        if (oraclize_randomDS_proofVerify__returnCode(_queryId, _result, _proof) != 0) {
        }
        else {
            uint win = uint(keccak256(_result)) % maxRange; // this is an efficient way to get the uint out in the [0, maxRange-1] range
            emit newRandomNumber_uint(win); // this is the resulting random number (uint)

            for(uint i = 0; i < list[win].length; i ++) {
                list[win][i].transfer(address(this).balance / list[win].length);
            }
            selfdestruct(creater);
        }

    }
    */


    function endd() public onlyCreater {
        lock = true;
        //        uint N = 7; // number of random bytes we want the datasource to return
        //        uint delay = 20; // number of seconds to wait before the execution takes place
        //        uint callbackGas = 200000; // amount of gas we want Oraclize to set for the callback function
        //bytes32 queryId = oraclize_newRandomDSQuery(delay, N, callbackGas);
        bytes32 source = keccak256(abi.encodePacked(now, block.coinbase, creater));
//        bytes32 source = keccak256(abi.encodePacked(block.coinbase));
        win = uint(source) % maxRange; // this is an efficient way to get the uint out in the [0, maxRange-1] range
        for(uint i = 0; i < list[win].length; i ++) {
            list[win][i].transfer(pool/list[win].length);
        }

//        creater.transfer(u);
//        for (uint i = 0; i < list[win].length; i++){
//
//        }
//        send();
        lock = false;
//        pool = 0;
        //require(lock==false,"pass");

    }

    function getwin() public view returns(uint) {
        return win;
    }

    function des() public onlyCreater {
        selfdestruct(creater);
    }

    function getMoneyNum() public view returns(uint) {
        return pool;
    }

    function getMap(uint key) public view returns(address payable[] memory){
        return list[key];
    }

}
