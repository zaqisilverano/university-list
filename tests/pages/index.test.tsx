import { render, screen } from '@testing-library/react'
import Home from '../../pages/index'

describe('University List App', () => {
  it('renders a page heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /university lists/i,
    })

    expect(heading).toBeInTheDocument();
  })
})