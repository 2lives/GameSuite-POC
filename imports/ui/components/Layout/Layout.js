import React from 'react';
import HeaderBar from '../HeaderBar';
import Footer from '../Footer';

const Layout = ({ children }) => (
    <div className="appContentWrapper">
        <div className="appHeader">
            <HeaderBar />
        </div>
        <div className="appContent">{children}</div>
        <Footer />
    </div>
);

// Layout.defaultProps = {
//     children: null
// };

// Layout.propTypes = {
//     children: PropTypes.node
// };

export default Layout;
