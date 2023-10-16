import { Icon } from '@iconify/react';
import CustomInput from '../components/CustomInput';
import { AiOutlineUser } from "react-icons/ai";

const Login = () => {
    return (
        <div className="h-full w-full flex flex-col items-center">
            <div className="logo p-5 w-full flex justify-center">
                <Icon icon="uil:music-note" width={60} />
            </div>
            <div className='inputRange w-1/3 py-10 flex flex-col items-center justify-center '>
                <div className='font-bold mb-10'>To Continue, login to musix</div>
                <CustomInput
                    label={"Email Address or Username"}
                    type={"text"}
                    placeholder={"Email Address or Username"}
                    icon={<AiOutlineUser />}
                />
            </div>
        </div>
    )
}

export default Login;