import Breadcrumb from '../../Components/Breadcrumb'
import StepperForm from './StepperForm';
import PropTypes from 'prop-types';


// Breadcrumb items
const breadcrumbItems = [
    { label: "Home", link: "/dashboard/home" },
    { label: "Upload", link: "/dashboard/upload" },
    ];

const Upload = ({isMobileScreen, isSidebarOpen, setIsSidebarOpen }) => {
    return (
        <>
            <Breadcrumb 
                title={"Upload Content"} 
                items={breadcrumbItems} 
                setIsSidebarOpen={setIsSidebarOpen}
                isSidebarOpen={isSidebarOpen}
                isMobileScreen={isMobileScreen}
            />
            <section className='px-3 md:px-8 lg:px-12 mb-5'>
                <StepperForm />
            </section>
        </>
    )
}

Upload.propTypes = {
    isMobileScreen: PropTypes.bool.isRequired,
    isSidebarOpen: PropTypes.bool.isRequired,
    setIsSidebarOpen: PropTypes.func.isRequired
};

export default Upload
