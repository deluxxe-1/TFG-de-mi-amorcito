import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

vi.mock('./scenes/LoadingScreen', () => ({
  default: () => <div>Loading Scene</div>,
}))
vi.mock('./scenes/CloudScene', () => ({
  default: () => <div>Cloud Scene</div>,
}))
vi.mock('./scenes/MainScene', () => ({
  default: () => <div>Main Scene</div>,
}))
vi.mock('./scenes/PondScene', () => ({
  default: () => <div>Pond Scene</div>,
}))
vi.mock('./scenes/TreeScene', () => ({
  default: () => <div>Tree Scene</div>,
}))
vi.mock('./scenes/GardenScene', () => ({
  default: () => <div>Garden Scene</div>,
}))

describe('App routes', () => {
  it('renders main route', () => {
    render(
      <MemoryRouter initialEntries={['/main']}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getByText('Main Scene')).toBeInTheDocument()
  })

  it('redirects unknown routes to loading', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getByText('Loading Scene')).toBeInTheDocument()
  })
})
