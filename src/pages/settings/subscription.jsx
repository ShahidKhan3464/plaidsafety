import React from 'react'
import { StyleSubscription } from './style'
import CustomButton from 'components/button'
import { customColors } from 'theme/pallete'

const Subscription = () => {
    return (
        <StyleSubscription>
            <h3 className='title'>Subscription</h3>
            <table>
                <thead>
                    <th>Subscription Type</th>
                    <th>Amount</th>
                    <th>Next Billing</th>
                    <th>Action</th>
                </thead>
                <tbody>
                    <td>Monthly</td>
                    <td>$10 ($49.99 Annual Fee)</td>
                    <td>5/24/2024</td>
                    <td>
                        <CustomButton
                            variant="outlined"
                            text="Cancel subscription"
                            tColor={customColors.secondary}
                            borderColor={customColors.secondary}
                            sxProps={{
                                width: '195px',
                                height: '52px',
                                fontWeight: 600,
                                fontSize: "16px",
                                boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)'
                            }}
                        />
                    </td>
                </tbody>
            </table>
        </StyleSubscription>
    )
}

export default Subscription
